import {Card, Col, Row, Typography} from "antd";
import {TaskList} from "../widgets/TaskList/ui/TaskList.tsx";
import { Layout } from 'antd';
const { Footer} = Layout;

function App() {

  return (
    <>
        <Row justify={"center"}>
            <Col span={6}></Col>
            <Col span={12} style={{textAlign: "center"}}>
                <Typography.Title level={1}>TODOS</Typography.Title>
                <Card>
                    <TaskList/>
                </Card>
            </Col>
            <Col span={6}></Col>
        </Row>
        <Footer style={{ textAlign: 'center', fontFamily: "sans-serif" }}>
            Виктория Альшенецкая ©{new Date().getFullYear()}
        </Footer>

    </>
  )
}

export default App
