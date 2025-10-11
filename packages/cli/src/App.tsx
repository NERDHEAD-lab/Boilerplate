import React from 'react';
import {Box, Text, useApp, useInput} from 'ink';
import TextInput from 'ink-text-input';
import {getWelcomeMessage} from '@example/core';

const Button = ({ label, isFocused }: { label: string; isFocused: boolean }) => (
    <Box
        borderStyle="round"
        borderColor={isFocused? 'cyan' : 'gray'}
        paddingX={2}
    >
        <Text color={isFocused? 'cyan' : 'white'}>{label}</Text>
    </Box>
);

const App = () => {
    const { exit } = useApp();
    const [focusedButton, setFocusedButton] = React.useState(0); // 0: Save, 1: Cancel
    const [inputValue, setInputValue] = React.useState('');
    const [message, setMessage] = React.useState('Select an action');
    const [inputFocus, setInputFocus] = React.useState(true);
    const [showExitConfirm, setShowExitConfirm] = React.useState(false);


    useInput((input, key) => {
        if (key.escape) {
            if (inputValue) {
                setInputValue('');
                setMessage('Input cleared');
            } else {
                if (!showExitConfirm) {
                    setInputFocus(false);
                    setFocusedButton(1);
                    // setShowExitConfirm(true);
                    return;
                }
            }
            return;
        }

        if (showExitConfirm) {
            if(input.toLowerCase() === 'y') {
                exit();
            } else if (input.toLowerCase() === 'n') {
                setShowExitConfirm(false);
                setMessage('Exit cancelled');
            }

            return;
        }

        if (!inputFocus) {
            if (key.leftArrow) {
                setFocusedButton(0);
            } else if (key.rightArrow) {
                setFocusedButton(1);
            } else if (key.upArrow) {
                setInputFocus(true);
            }

            if (key.return) {
                if (focusedButton === 0) {
                    setMessage(getWelcomeMessage(inputValue));
                } else if (focusedButton === 1) {
                    setMessage('Cancelled!');
                    setShowExitConfirm(true);
                }
            }
        }

        if (key.tab) {
            setInputFocus(f => !f);
        } else if (inputFocus && key.downArrow) {
            setInputFocus(false);
        } else if (inputFocus && key.return) {
            setMessage(getWelcomeMessage(inputValue));
        }
    });

    return (
        <Box borderStyle="round" borderColor="green" padding={2} flexDirection="column" alignItems="center">
            <Text bold color="yellow">{message}</Text>
            <Box height={1} />
            <Box>
                <Text>입력: </Text>
                <TextInput
                    value={inputValue}
                    onChange={setInputValue}
                    focus={inputFocus}
                />
            </Box>
            <Box height={1} />
            <Box>
                <Button label=" Save " isFocused={focusedButton === 0 && !inputFocus} />
                <Box width={2} />
                <Button label=" Cancel " isFocused={focusedButton === 1 && !inputFocus} />
            </Box>
            <Box height={1} />
            <Text>Tab키로 입력/버튼 선택 전환, 좌/우 화살표로 버튼 선택, Enter로 실행.</Text>
            <Text>Esc로 종료.</Text>

            {showExitConfirm && (
                <Box flexDirection="column" marginTop={1}>
                    <Text color="red">정말 종료하시겠습니까? (y/n)</Text>
                </Box>
            )}
        </Box>
    );
};

export default App;