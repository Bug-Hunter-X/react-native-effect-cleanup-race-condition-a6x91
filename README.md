# React Native useEffect Cleanup Race Condition

This repository demonstrates a common but easily missed issue in React Native: a race condition between the asynchronous operations within a `useEffect` hook and the component's unmounting. When navigating away quickly from a screen making an API call, the cleanup function might not be executed, leading to potential problems.

## Problem

The problem stems from the asynchronous nature of network requests or other I/O operations within `useEffect`. If a component unmounts before an asynchronous operation completes, the cleanup function (the return value of `useEffect`) may not be called.

## Solution

The solution involves ensuring that asynchronous operations are properly cancelled or managed to prevent the race condition.  This usually involves using AbortController to abort the fetch requests before they are completed. 