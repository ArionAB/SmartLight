import { useState, FC, forwardRef, ReactElement, Ref } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Alert } from '@mui/material';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const DeleteDialog: FC<{ open: boolean, setOpen: Function, title: string, message: string, yesAction: Function }> = ({
    open, setOpen, title, message, yesAction
}) => {

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Alert severity="error">{title}</Alert>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    gap: '2rem'
                }}>
                    <Button onClick={handleClose}>Renunță</Button>
                    <Button color="error" variant='contained' onClick={() => yesAction()}>Da</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}