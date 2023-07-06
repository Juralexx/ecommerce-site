import React from "react"
import { Carrier, Customer } from '@/types'
import { SelectCard } from "@/components/global";

interface Props {
    user: Customer.Options;
    carriers: Carrier.Options[];
    selectedCarrier: Carrier.Options;
    onCarrierSelection: (...args: any) => void;
}

export default function OrderDeliveryTemplate({ user, carriers, selectedCarrier, onCarrierSelection }: Props) {
    return (
        <div className='p-7 bordered bg-white boxshadow-lg-colored rounded-xl'>
            <h2>
                Comment souhaitez-vous être livré ?
            </h2>
            <div className="grid grid-cols-1 gap-y-3">
                {carriers.map((carrier, i) => {
                    const { name, description, delivery_estimate } = carrier;
                    console.log(selectedCarrier._id ,carrier._id);
                    return (
                        name &&
                        <SelectCard
                            key={i}
                            title={name}
                            onClick={() => onCarrierSelection(carrier)}
                            checked={(selectedCarrier._id === carrier._id)}
                        >
                            {description &&
                                <p>{description}</p>
                            }
                            {delivery_estimate && (
                                <div className="mt-4">
                                    <span className="font-semibold mt-4">Livraison estimés (jours ouvrés) : </span>
                                    {delivery_estimate.minimum && !delivery_estimate.maximum &&
                                        <span>Au moins {delivery_estimate.minimum * 24}h après expédition</span>
                                    }
                                    {!delivery_estimate.minimum && delivery_estimate.maximum &&
                                        <span>Jusqu'à {delivery_estimate.maximum * 24}h après expédition</span>
                                    }
                                    {delivery_estimate.minimum && delivery_estimate.maximum &&
                                        <span>{delivery_estimate.minimum * 24}h/{delivery_estimate.maximum * 24}h après expédition</span>
                                    }
                                </div>
                            )}
                            <div className="flex justify-end">
                                <p>
                                    <span className="text-2xl font-semibold">{Number(carrier.price).toFixed(2)}</span>€
                                </p>
                            </div>
                        </SelectCard>
                    )
                })}
            </div>
        </div>
    )
}