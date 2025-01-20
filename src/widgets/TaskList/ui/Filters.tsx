import {Space, Tag} from "antd";
import {TASK_STATUS} from "../../../entities/Task/model";

export function Filters({currentFilter, setFilter}: {currentFilter: TASK_STATUS|null, setFilter: (newStatus: TASK_STATUS|null) => void}) {
    return (
        <>
            <Space style={{width: "100%"}}>
                <Tag.CheckableTag
                    checked={currentFilter === null}
                    onClick={() => setFilter(null)}
                >
                    All
                </Tag.CheckableTag>
                <Tag.CheckableTag
                    checked={currentFilter === TASK_STATUS.TODO}
                    onClick={() => setFilter(TASK_STATUS.TODO)}
                >
                    Active
                </Tag.CheckableTag>
                <Tag.CheckableTag
                    checked={currentFilter === TASK_STATUS.DONE}
                    onClick={() => setFilter(TASK_STATUS.DONE)}
                >
                    Completed
                </Tag.CheckableTag>
            </Space>
        </>
    );
}

