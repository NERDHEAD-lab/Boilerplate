#!/usr/bin/env node

import React, {useState, useEffect} from 'react';
import {Box, render, Text, useInput} from 'ink';
import App from "./App.js";

const Counter: React.FC = () => {
    const countPaused = React.useRef(false);
    const [counter, setCounter] = useState(0);

    useInput((input, key) => {
        if (key.return) {
            countPaused.current = !countPaused.current;
        }
    });

    useEffect(() => {
        const timer = setInterval(() => {
            if (countPaused.current) return;
            setCounter(previousCounter => previousCounter + 1);
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box borderStyle="round" borderColor="green" padding={2} flexDirection="column" alignItems="center">
            <Text color="green">{counter} tests passed</Text>
        </Box>
    );
};


render(
    <Box justifyContent="center" alignItems="center">
        <Box
            flexDirection="row"
            gap={2}
            padding={1}
            borderStyle="round"
            borderColor="blue"
            alignItems="flex-start"
        >
            <App/>
            <Counter/>
        </Box>
    </Box>
);
