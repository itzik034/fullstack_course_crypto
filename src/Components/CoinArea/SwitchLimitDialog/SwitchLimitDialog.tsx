import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Switch, Typography } from "@mui/material";
import "./SwitchLimitDialog.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { useEffect, useState } from "react";
import { CoinModel } from "../../../Models/CoinModel";

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function SwitchLimitDialog(props: DialogProps) {
    
    const coins = useSelector<AppState, CoinModel[]>(state => state.coins.coins);
    const [trackedIds, setTrackedIds] = useState<string[]>([]);

    useEffect(() => {
        
        if(props.isOpen) {
            const saved = localStorage.getItem("coinsSwitches");
            setTrackedIds(saved ? JSON.parse(saved) : []);
        }

    }, [props.isOpen]);

    const trackedCoins = coins.filter(c => trackedIds.includes(c.id!));

    const handleToggle = (id: string) => {
        const updatedIds = trackedIds.filter(coinId => coinId !== id);
        setTrackedIds(updatedIds);
        localStorage.setItem("coinsSwitches", JSON.stringify(updatedIds));
    };
    
    return (
        <div className="SwitchLimitDialog">

            <Dialog
                open={props.isOpen}
                onClose={props.onClose}
                sx={{ "& .MuiDialog-paper": { borderRadius: "15px", padding: "10px" } }}>
                <DialogTitle>Limit Reached</DialogTitle>

                <DialogContent>
                    <Typography>
                        You can only track up to 5 coins.
                        <br />
                        Please unselect a coin before adding a new one.
                    </Typography>

                    <List>
                        {trackedCoins.map(coin => (
                            <ListItem key={coin.id} divider>
                                
                                <ListItemText
                                    primary={coin.name}
                                    secondary={coin.symbol!.toUpperCase()} />

                                <Switch
                                    checked={true}
                                    onChange={() => handleToggle(coin.id!)}
                                    color="secondary" />

                            </ListItem>
                        ))}
                    </List>
                </DialogContent>

                <DialogActions>
                    <Button onClick={props.onClose} variant="contained" color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
