import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from './Dialog';
import Button from './Button';
import Divider from './Divider';

interface Props extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmButton?: string;
    text?: string;
}

const ConfirmDialog = (props: Props) => {
    const { title, open, onClose, onConfirm, confirmButton, text } = props;

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle color='text.secondary'>
                {title}
            </DialogTitle>
            {text &&
                <DialogContent>
                    {text}
                </DialogContent>
            }
            <Divider />
            <DialogActions>
                <Button
                    className='v-text'
                    onClick={onClose}
                >
                    Annuler
                </Button>
                <Button onClick={() => { onClose(); onConfirm(); }}>
                    {confirmButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;