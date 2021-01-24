import React from 'react';
import {useDispatch} from "react-redux";
import promotionsActions from "../../store/promotions/actions/actions";
import PromotionsTable from "../../components/promotions/promotions-table/PromotionsTable";
import "./PromotionsScreen.scss"

const PromotionsScreen: React.FC = () => {
    // Fetch initial promotions data
    const dispatch = useDispatch();
    dispatch(promotionsActions.getInitialPromotions());

    return (
        <div className='promotions-screen'>

            <div className='promotions-table-container'>
                <PromotionsTable/>
            </div>
        </div>
    );
}

export default PromotionsScreen;
