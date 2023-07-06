import { Alert } from '@/components/global';
import useAlert from './useAlert';

const AlertPopup = () => {
    const { text, type } = useAlert();

    if (text && type) {
        return (
            <Alert
                type={type}
                style={{
                    position: 'fixed',
                    top: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2000,
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                }}
            >
                {text}
            </Alert>
        );
    } else {
        return <></>;
    }
};

export default AlertPopup;