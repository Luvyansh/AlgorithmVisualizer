import React from 'react';
import {getMergeSortAnimations, getBubbleSortAnimations, getQuickSortAnimations, getHeapSortAnimations, getInsertionSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'linear-gradient(180deg, #FF7A89, #C1666B)';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'linear-gradient(180deg, #6DD5FA, #2980B9)';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i=0; i < 150; i++)
        {
            array.push(randomIntFromInterval(5,750));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                barOneStyle.background = color;
                barTwoStyle.background = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 4 < 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.background = color;
                    barTwoStyle.background = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort() {
        const animations = getHeapSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 4 < 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.background = color;
                    barTwoStyle.background = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 4 < 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.background = color;
                    barTwoStyle.background = color;
                }, i * 1);
            } else {
                setTimeout(() => {
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    barStyle.height = `${newHeight}px`;
                }, i * 1);
            }
        }
    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 4 < 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.background = color;
                    barTwoStyle.background = color;
                }, i * 1);
            } else {
                setTimeout(() => {
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    barStyle.height = `${newHeight}px`;
                }, i * 1);
            }
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{height:`${value}px`}}>
                            {/* {value} */}
                        </div>
                    ))}
                </div>
                <button class="generate-array" onClick={() => this.resetArray()}>Generate New Array</button>
                <button class="sort-button" onClick={() => this.mergeSort()}>Merge Sort</button>
                <button class="sort-button" onClick={() => this.quickSort()}>Quick Sort</button>
                <button class="sort-button" onClick={() => this.heapSort()}>Heap Sort</button>
                <button class="sort-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button class="sort-button" onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button class="profile" onClick={() => window.open("https://luvs-portfolio.web.app")}>Visit my profile</button>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}