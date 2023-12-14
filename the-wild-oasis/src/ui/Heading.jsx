import styled, { css } from "styled-components";

const Heading = styled.h1`
${(props) => props.type === "h1" && 
css`
font-size: 30px;
  font-weight: 600;
`
}

${(props) => props.as === "h2" && 
css`
font-size: 2rem;
  font-weight: 600;
`
}

${(props) => props.as === "h3" && 
css`
font-size: 1rem;
  font-weight: 600;
`
}



line-height: 1.4;
  
 
`;

export default Heading;  