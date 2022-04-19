const initialState = {
    counter: 5
};

const counter = (state = initialState, action) => {
    switch (action.type) {
        case "DEC":
            return {
                ...state,
                counter: state.counter - 1,
        };
        case "SET":
            console.log('SET');
            return {
                ...state,
                counter: 5,
        };
        default:
            return state;
    }
}

export default counter;