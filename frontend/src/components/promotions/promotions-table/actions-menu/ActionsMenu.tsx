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

    };

    const openDuplicateDialog = () => {

    };

    const deleteRecord = () => {
        dispatch(promotionsActions.deletePromotion(promotionId));
    };

    const showActions = () => {
        setCurrentEditedRecordsKey(promotionId);
    };

    return promotionId === currentEditedPromotionId ?
        (<div className="actions-menu">
            <button onClick={openEditDialog}>Edit</button>
            <button onClick={openDuplicateDialog}>Duplicate</button>
            <button onClick={deleteRecord}>Delete</button>
        </div>) :
        (<button onClick={showActions}>Actions</button>)
};


export default ActionsMenu;
