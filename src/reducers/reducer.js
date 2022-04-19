const initialState = {
    counter: 5
};

const counter = (state = initialState, action) => {
    switch (action.type) {
        case "DEC":
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
}

export default counter;