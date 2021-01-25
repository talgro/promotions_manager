import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import promotionsSelectors from "../../../store/promotions/selectors/selectors";
import "./PromotionsTable.scss"
import promotionsActions from "../../../store/promotions/actions/actions";
import ActionsMenu from "./actions-menu/ActionsMenu";
import {ClipLoader} from "react-spinners";

const PromotionsTable: React.FC = () => {
    const [previousScrollTop, setPreviousScrollTop] = useState<number>(0);
    const [currentEditedRecordsKey, setCurrentEditedRecordsKey] = useState<string>("");

    const isFetchingInitialRecords = useSelector(promotionsSelectors.isFetchingInitialRecords);
    const isFetchingNextRecords = useSelector(promotionsSelectors.isFetchingNextRecords);
    const isFetchingPreviousRecords = useSelector(promotionsSelectors.isFetchingPreviousRecords);

    const promotionFields = useSelector(promotionsSelectors.getPromotionFields).filter(field => field !== "pid");
    const promotions = useSelector(promotionsSelectors.getPromotions);

    const dispatch = useDispatch();

    const fillDbWithMockData = () => {
        dispatch(promotionsActions.fillDbWithMockData());
    };

    const addItemsToTop = () => {
        const firstRecordId = promotions[0].pid;
        dispatch(promotionsActions.getPartialPromotions(firstRecordId, true));
    };

    const addItemsToBottom = () => {
        const lastRecordId = promotions[promotions.length - 1].pid;
        dispatch(promotionsActions.getPartialPromotions(lastRecordId, false));
    };

    const onTableScroll = (event: React.UIEvent) => {
        const target = event.target as any;
        const scrollPercentage = 100 * target.scrollTop / (target.scrollHeight - target.clientHeight);
        const isDownScroll = target.scrollTop > previousScrollTop;
        const thresholdPercentage = 33;
        if (isDownScroll) {
            const passedThreshold = scrollPercentage > (100 - thresholdPercentage);
            if (passedThreshold && !isFetchingNextRecords) {
                addItemsToBottom();
            }
        } else {
            // up scroll
            const passedThreshold = scrollPercentage < thresholdPercentage;
            if (passedThreshold && !isFetchingPreviousRecords) {
                addItemsToTop();
            }
        }

        setPreviousScrollTop(target.scrollTop);
    };

    return isFetchingInitialRecords ?
        (<div className="loader">
            <ClipLoader/>
            This action can take a minutes or two...
        </div>) :
        (
            <div className="promotions-table-wrapper">
                <button className="mock-button" onClick={fillDbWithMockData}>
                    CLICK HERE TO GENERATE MOCK DATA (10,000 RANDOM RECORDS)
                </button>
                <div className="card table-component">
                    <div onScroll={onTableScroll} className="promotions-table">
                        <table>
                            <thead>
                            {/* table headers */}
                            <tr>
                                {promotionFields.map(field => (
                                    <th style={{width: `${(1 / promotionFields.length) * 85}%`}}
                                        key={field}>{field}</th>
                                ))}
                                <th className="actions-col"> {/* placeholder for actions column */} </th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* table rows */}
                            {promotions.map((promotion) => (
                                <tr key={promotion.pid}>
                                    {/*/!* row cells *!/*/}
                                    {promotionFields.map(field => (
                                        <td key={field.concat(promotion.pid)}>{promotion[field]}</td>))}
                                    <td className="actions-menu-td">
                                        <ActionsMenu promotionId={promotion.pid}
                                                     currentEditedPromotionId={currentEditedRecordsKey}
                                                     setCurrentEditedRecordsKey={setCurrentEditedRecordsKey}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
}

export default PromotionsTable;
