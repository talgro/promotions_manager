import React from "react";
import "./ActionsMenu.scss"
import {useDispatch} from "react-redux";
import promotionsActions from "../../../../store/promotions/actions/actions";

interface ActionsMenuProps {
    promotionId: string;
    currentEditedPromotionId: string;
    setCurrentEditedRecordsKey: (newKey: string) => void;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({
                                                     promotionId,
                                                     currentEditedPromotionId,
                                                     setCurrentEditedRecordsKey
                                                 }) => {
    const dispatch = useDispatch();

    const openEditDialog = () => {
        //s
    };

    const openDuplicateDialog = () => {

    };

    const deleteRecord = () => {
        dispatch(promotionsActions.deletePromotion(promotionId));
    };

    const showActions = () => {
        setCurrentEditedRecordsKey(promotionId);
    };

    const isSelected = promotionId == currentEditedPromotionId;
    return (
        <div className="actions-menu">
            <button onClick={isSelected ? openEditDialog : showActions}>{isSelected ? "Edit" : "Actions"}</button>
            <button onClick={openDuplicateDialog} style={{opacity: isSelected ? 1 : 0}}>Duplicate</button>
            <button onClick={deleteRecord} style={{opacity: isSelected ? 1 : 0}}>Delete</button>
        </div>
    );
};


export default ActionsMenu;
