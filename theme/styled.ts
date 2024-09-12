import styled, { css, keyframes } from "styled-components";
import theme from ".";

export const setCols = (
  cols: 1 | 2 | 3 | 4 | 10 | 20 | 30 | 35 | 40 | 50 | 60 | 65 | 70 | 80 | 90
) => {
  const col = {
    1: "100%",
    2: "50%",
    3: "33.33333%",
    4: "25%",
    10: "10%",
    20: "20%",
    30: "30%",
    35: "35%",
    40: "40%",
    50: "50%",
    60: "60%",
    65: "65%",
    70: "70%",
    80: "80%",
    90: "90%",
  };
  return col[cols];
};

export const Col = styled.div`
  display: flex;
  & > * {
    &:first-child {
      flex: 0 0 60%;
    }
    &:last-child {
      flex: 0 0 40%;
    }
  }
  .customize {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .content {
      padding: ${theme.spaces.space6};
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        color: ${theme.colors.grey};
        font-size: ${theme.font.size.big};
      }
      p {
        margin-top: ${theme.spaces.space2};
        font-size: ${theme.font.size.large};
        color: ${theme.colors.lightGrey};
      }
    }
    .form-content {
      box-sizing: border-box;
      padding: ${theme.spaces.space12};
      width: 100%;
      & > * {
        margin-bottom: ${theme.spaces.space2};
        &:first-child {
          margin-bottom: ${theme.spaces.space2};
        }
      }
    }
    .form-action {
      width: 60%;
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    .customize {
      .form-content {
        width: 100%;
        padding: ${theme.spaces.space6};
      }
    }
  }
`;

export const Container = styled.div`
  padding: ${theme.spaces.space4} ${theme.spaces.space12};
  box-sizing: border-box;
  max-width: 1440px;
  min-width: 1440px;
  @media only screen and (max-width: 1440px) {
    max-width: 100%;
    min-width: 100%;
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spaces.space1};
    min-width: 100%;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spaces.space1};
    margin: 0;
    min-width: 100%;
  }
`;

export const ContentTitle = styled(Container)`
  margin: 0 auto;
  padding-top: 0;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2 {
      font-weight: bold;
      color: ${theme.colors.dark};
      text-transform: uppercase;
      margin: ${theme.spaces.space4} ${theme.spaces.space2};
    }
    .component {
      margin-right: 10px;
      .toggle-mobile {
        span {
          cursor: pointer;
          font-size: ${theme.font.size.normal};
        }
      }
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    .title {
      h2 {
        font-size: ${theme.font.size.normal};
      }
    }
  }
`;

export const Content = styled(Container)`
  text-align: left;
  margin: 0 auto;
  .show-more {
    text-align: center;
    margin: ${theme.spaces.space8} 0 ${theme.spaces.space12};
  }
  .card-list {
    display: flex;
    flex-flow: row wrap;
    .card {
      flex: 0 0 ${(p) => setCols(3)};
      width: ${(p) => setCols(3)};
    }
    .empty-data {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      h2 {
        font-weight: bold;
      }
    }
  }
  .card-map {
    margin-top: ${theme.spaces.space2};
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    .card-list {
      .card {
        flex: 0 0 ${(p) => setCols(2)};
      }
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    margin: 0;
    h2 {
      font-size: ${theme.font.size.normal};
    }
    .card-list {
      .card {
        flex: 0 0 ${(p) => setCols(1)};
      }
    }
    .card-map {
      margin-top: 0;
      .mapper {
      }
    }
  }
`;

export const Centered = styled(Content)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerFull = styled.div<{ kind?: string }>`
  ${(p) => p.kind && `background: ${p.kind}`};
  width: 100%;
`;

export const ContentMap = styled.div<{ view?: string }>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  height: calc(100svh - 190px);
  &.between {
    justify-content: space-between;
  }
  .content {
    &.p-0 {
      padding: 0;
    }
    &.content-map {
      flex: 1 0 50%;
    }
    &.content-card {
      flex: 1 0 50%;
      overflow-y: scroll;
      max-height: 100%;
      max-width: 1000px;
      .card-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .card {
          flex: 0 0 ${setCols(3)};
          width: ${setCols(3)};
        }
      }
    }
  }
  .show-more {
    width: 100%;
    text-align: center;
    margin: ${theme.spaces.space8} 0 ${theme.spaces.space12};
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    .content {
      &.content-card {
        .card-list {
          .card {
            flex: 0 0 ${setCols(2)} !important;
            width: ${setCols(2)};
          }
        }
      }
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    .content {
      &.content-card {
        flex: 1 0 ${setCols(1)};
        max-height: 400px;
        .card-list {
          .card {
            flex: 0 0 ${setCols(1)} !important;
            width: ${setCols(1)};
          }
        }
      }
    }
  }
`;

export const ContainerDetail = styled.div`
  padding: ${theme.spaces.space4} ${theme.spaces.space15};
  box-sizing: border-box;
  max-width: 1300px;
  min-width: 1300px;
  @media only screen and (max-width: 1300px) {
    max-width: 100%;
    min-width: 100%;
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spaces.space6};
    min-width: 100%;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    padding: "";
    margin: 0;
    min-width: 100%;
  }
`;

export const ContentDetail = styled(Container)<{ noMargin?: boolean }>`
  ${(p) => (p.noMargin ? "max-width: 100%" : "max-width: 1300px")};
  ${(p) => (p.noMargin ? "margin: 0" : "margin: 0 auto")};
  width: 100%;
  h2 {
    font-size: ${theme.font.size.big};
    margin: ${theme.spaces.space4} 0;
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    .content-detail {
      flex-direction: column;
      & > div {
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    margin: 0;
    padding: 0;
  }
`;

export const Column = styled.div<{ cols: number | any }>`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  flex: 0 0 ${({ cols }) => setCols(cols)};
  width: ${({ cols }) => setCols(cols)};
  padding: ${theme.spaces.space2};
  height: 100%;
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    flex: 0 0 45%;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    flex: 0 0 100%;
    padding: 0;
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(0px, -30px);
  }
  50% {
    opacity: 1;
    transform: translate(0px, -20px);
  }
  100% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
  50% {
    opacity: 1;
    transform: translate(0px, -20px);
  }
  100% {
    opacity: 0;
    transform: translate(0px, -30px);
  }
`;
