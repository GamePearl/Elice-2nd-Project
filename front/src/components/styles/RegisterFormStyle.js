import styled from "styled-components"

export const Form = styled.form`
  .formFieldset {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  .formFieldset:not(:first-of-type) {
    border-bottom: none;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }

  .formFieldset {
    display: flex;
    flex-direction: column;
    border: none;
    padding: 12px 0;
  }

  .formLabel {
    display: block;
    padding-bottom: 8px;

    font-size: 0.8rem;
    color: gray;
  }

  .buttonContainer {
    display: flex;
  }

  .formButton {
    flex: 1;
    border: none;
    padding: 4px;
    color: white;
    font-weight: 700;

    border-radius: 3px;
    cursor: pointer;
  }

  .resetButton {
    background: #adb5bd;
  }

  .submitButton {
    background: #6c63ff;
  }

  .formButton:not(:first-of-type) {
    margin-left: 8px;
  }

  .error {
    color: #ff6b6b;
    font-size: 0.8rem;
    min-height: 20px;
    margin-top: 4px;
  }
`
