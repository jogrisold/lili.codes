import styled from "styled-components";
import { Icon } from '@iconify/react';

const Error = () => {
    return(
        <>
            <FlexColumn>
                {/* <Icon icon="noto:bomb" style={{ fontSize: '70px' }}/> */}
                <ErrorMsg> It's an error! </ErrorMsg>
                <Instructions>Please try refreshing the page or <Contact href = "#">contact support</Contact> if the problem persists.</Instructions>
            </FlexColumn>
        </>
    )
}

export default Error;

const ErrorMsg = styled.div`
    font-size: 24px;
    font-weight: 900;
    margin: 10px;
    text-align: center;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  align-items: center;
  margin-top: 50px;  
`;
const Instructions = styled.div`
    font-size: 18px;
    text-align: center;
    margin: 10px;
`;
const Contact = styled.a`
    font-size: 18px;

`;