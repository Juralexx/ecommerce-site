import React from 'react'
import { DateRange } from 'react-day-picker';
import { dateParser, formatDate } from './utils';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Props {
    filters: any[] | null;
    searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * Convert array of object as { name: name, value: value } to query params : name=value&value=value
 * @param array Array of queries
 */

function arrayToQueryParams(array: any[]) {
    const parts = array.map((param) => {
        return encodeURIComponent(param.name) + '=' + encodeURIComponent(param.value);
    });
    return parts.join('&');
};

/**
 * Hook to manipulate and pass search params to url
 */

const useQueryParams = ({ filters, searchParams }: Props) => {
    //NextJS router
    const router = useRouter();
    //Get current pathname
    const pathname = usePathname();
    //Search params filters to pass to the url
    const [activeFilters, setActiveFilters] = React.useState<Record<string, any>[]>([]);

    /**
     * Function that pass the `activeFilters` objects to the url
     */

    function populateQuery() {
        //Convert activeFilters to the valid query object structure with name and value
        let filters = activeFilters.map(e => ({ name: e.parameter, value: e.value }));
        //Query passed to the NextJS router
        let query: Record<string, any> = {};

        //Check if search param 'q' is already present in the URL
        if (searchParams['q']) {
            //Assign the search param 'q' to the 'q' variable
            const q = searchParams['q'];
            //Push the 'q' param to the filters to keep it in the URL
            filters.push({ name: 'q', value: q });
        }

        //For each query in 'filters'
        for (let i = 0; i < filters.length; i++) {
            //Get the name and value of the query
            const { name, value } = filters[i];

            //If 'i' is greater than 0 (so we already have params in our 'query' object)
            //And the param name already exists in the query 'object'
            if (i > 0 && query[name]) {
                //If the current param name is equal to the previous param name
                if (name === filters[i - 1].name) {
                    //We add the current param value to the already existing params
                    query[name] = query[name] + ',' + value;
                }
            }
            //Else we assign the new query param
            else {
                query[name] = value;
            }
        }

        //Convert the 'query' object to an array to be able to convert it in query params string
        const queryObjToArr = Object.entries(query).map(([key, value]) => {
            return { name: key, value: value }
        })

        //Push the query params to the url
        router.push(`${pathname}?${arrayToQueryParams(queryObjToArr)}`);
    }

    /**
     * Function to add or remove the filter to the 'activeFilters'
     * @param filter Filter to deal with. Structure:  `{ label: 'Publié', parameter: 'published', value: 'true' }`
     * @param prop Property that contain the search param name
     * @param unique Prevent filter that have only two possible values (Ex: true or false) to be duplicated.
     * Remove it if it is already present, change it if the value change or add if it doesn't exists yet.
     */

    const onFilterClick = (filter: any, prop: string, unique?: boolean) => {
        //Deep 'activeFilters' duplication to mutate the original 'activeFilters'
        let filters = [...activeFilters];

        //Assign a default value to the 'filter' index in the 'activeFilters' to prevent errors
        let index = -1;

        //If the search param shouldn't be unique and can be used multiple time in the url (a=1&a=2)
        if (!unique) {
            //Find the index where the param name and value are the same
            index = filters.findIndex(el => (el[prop] === filter[prop]) && (el.value === filter.value));

            //If the index doesn't exists
            if (index === -1) {
                //Push the filter to the 'activeFilters'
                setActiveFilters(prev => [...prev, filter]);
            } else {
                //Else remove it from 'activeFilters'
                filters.splice(index, 1);
                setActiveFilters(filters);
            }
        }
        //If the search param should be unique
        else {
            //Find the index where the param name is the same
            index = filters.findIndex(el => el[prop] === filter[prop]);

            //If the index deson't exists
            if (index === -1) {
                //Push the filter to the 'activeFilters'
                setActiveFilters(prev => [...prev, filter]);
            }
            //If index exists
            else {
                //If the value of the index is different
                if (filter.value !== filters[index].value) {
                    //Replace the old filter value by the new value
                    filters.splice(index, 1);
                    setActiveFilters([...filters, filter]);
                }
                //If the value of the index is the same
                else {
                    //Remove it from 'activeFilters'
                    filters.splice(index, 1);
                    setActiveFilters(filters);
                }
            };
        };
    };

    /**
     * Function to remove filters from 'activeFilters'
     * @param param Filter name : `string` or `array`
     * @param value Filter value : `string` | `boolean` | `number`
     */

    const removeFilters = (param: string | Array<string>, value?: string | boolean | number) => {
        //Deep 'activeFilters' duplication to mutate the original 'activeFilters'
        let filters = [...activeFilters]

        //If there's mutiple params to remove
        if (Array.isArray(param)) {
            //For each param
            param.forEach(p => {
                //If a value is specified, remove only the params matching the value
                if (value) {
                    filters = filters.filter(el => el.parameter !== p && el.value !== value)
                }
                //If a value is not specified, remove specified params
                else {
                    filters = filters.filter(el => el.parameter !== p)
                }
            })
        }
        //If there's only one param to remove
        else {
            //If a value is specified, remove only the params matching the value
            if (value) {
                filters = filters.filter(el => el.parameter !== param && el.value !== value)
            }
            //If a value is not specified, remove specified params
            else {
                filters = filters.filter(el => el.parameter !== param)
            }
        }
        //Assign new filters array to 'activeFilters'
        setActiveFilters(filters)
        //Return the new filters array
        return filters
    }

    /**
     * Remove the query params from the URL
     * @param param Filter name : `string` or `array`
     * @param value Filter value : `string` | `boolean` | `number`
     */

    const removeQueryParams = (param: string | Array<string>, value?: string | boolean | number) => {
        //If the param includes the 'from' date range param
        if (param.includes('from')) {
            //If the param is a string and not an array
            if (typeof param === 'string')
                //Add the 'from' and the 'to' date range param to the params that have to be removed
                param = [param, 'to'];
            //Else add the 'to' date range param to the params that have to be removed
            else param = [...param, 'to'];
        }

        //Remove the filters from the 'activeFilters' and get the new filters
        const filters = removeFilters(param, value);
        //Convert the new filters to valid search params objects : { name: e.parameter, value: e.value }
        let query = arrayToQueryParams(filters.map(e => ({ name: e.parameter, value: e.value })));
        //Assign the new search params to the URL
        return router?.push(`${pathname}?${query}`);
    };

    /**
     * Reset all search params, remove them all from 'activeFilters' and URL
     */

    const onReset = () => {
        //Set 'activeFilters' to empty array
        setActiveFilters([])
        //Remove all search params from the URL
        router?.replace(pathname)
    }

    /**
     * Hook to add query params to the 'activeFilters' on page reload.
     * Retrieve them from the URL to store them in 'activeFilters'.
     */

    React.useEffect(() => {
        //For each filters
        filters?.forEach(filter => {
            let query
            //If the filter value is an array
            if (Array.isArray(filter)) {
                //For each values of the query param
                filter.forEach(el => {
                    //Pass the router param to the 'query' variable
                    query = searchParams[el.parameter]
                    //If the 'query' variable is defined and its value is equal to the query param value
                    if (query && query === el.value) {
                        //If activeFilters do not already contains it
                        //Store the param in 'activeFilters'
                        if (!activeFilters.some(e => e[el.parameter] === el.value)) {
                            setActiveFilters(prev => ([...prev, el]))
                        }
                    }
                })
            }
            //If the filter value is a string
            else {
                //Pass the router param to the 'query' variable
                query = searchParams[filter.parameter]
                //If the 'query' variable is defined and its value is equal to the query param value
                if (query && query === filter.value) {
                    //If activeFilters do not already contains it
                    //Store the param in 'activeFilters'
                    if (!activeFilters.some(el => el[filter.parameter] === filter.value)) {
                        setActiveFilters(prev => ([...prev, filter]))
                    }
                }
            }
        })
    }, [])

    //Date picker boolean to open and close it
    const [datepicker, setDatepicker] = React.useState<boolean>(false)

    //Assign default values 'from' and 'to' to the date range
    const defaultSelected: DateRange = {
        from: undefined,
        to: undefined
    };

    //Date range values, { from: ..., to: ... } for the datePicker component
    const [range, setRange] = React.useState<DateRange | undefined>(defaultSelected);

    /**
     * Hook to deal with 'from' and 'to' query params date range
     * Add them to the 'activeFilters' and the date 'range' variable
     */

    React.useEffect(() => {
        //If URL contains query params
        const query = searchParams
        //If URL contains 'from' search param and it's a valid date
        if (query.from && Date.parse(query.from as string)) {
            //If there's no 'to' query param
            if (!query.to) {
                //Add the 'from' query param to the 'activeFilters'
                setActiveFilters(prev => [...prev, { label: dateParser(query.from), parameter: 'from', value: query.from }])
                //Add the 'from' query param to the date range variable
                setRange({ from: new Date(query.from as string) })
            }
            //If there's 'to' query param
            else {
                //If 'to' query param is a valid date
                if (Date.parse(query.to as string)) {
                    //Add 'from' and 'to' query param to the 'activeFilters'
                    setActiveFilters(prev => [
                        ...prev,
                        { label: `du ${dateParser(query.from)} au ${dateParser(query.to)}`, parameter: 'from', value: query.from },
                        { parameter: 'to', value: query.to },
                    ])
                    //Add the 'from' and 'to' query param to the date range variable
                    setRange({ from: new Date(query.from as string), to: new Date(query.to as string) })
                }
            }
        }
    }, [router])

    /**
     * Hook to deal with 'from' and 'to' query params date range in the 'activeFilters' on 'range' variable update
     */

    React.useEffect(() => {
        //If range and range.from are defined
        if (range && range.from) {
            //Remove the 'from' and 'to' query filters
            removeFilters(['from', 'to'])
            //If range.to is undefined
            if (!range.to) {
                //Push only the 'from' query param
                setActiveFilters(prev => [...prev, { label: dateParser(range.from), parameter: 'from', value: formatDate(range.from) }])
            } else {
                //Push both 'from' and 'to' query params
                setActiveFilters(prev => [
                    ...prev,
                    { label: `du ${dateParser(range.from)} au ${dateParser(range.to)}`, parameter: 'from', value: formatDate(range.from) },
                    { parameter: 'to', value: formatDate(range.to) },
                ])
            }
        }
    }, [range])

    return {
        activeFilters,
        setActiveFilters,
        populateQuery,
        removeFilters,
        removeQueryParams,
        onReset,
        onFilterClick,
        datepicker,
        setDatepicker,
        range,
        setRange
    }
}

export default useQueryParams