const localStorageItemName = 'rootRegistry';

const initState = {
    items: {
        help: {
            hash: 'QmTf9ooSeBJMe4HbuXsebCukHDZbUtY8qWqP82us4Uvjwc',
            protocol: 'ipfs',
        },
        cyber: {
            hash: 'QmXCCZ7gjbQFRSrTGQ1Vuwf7LWVgv3xbS4eruE4uKrqytc',
            protocol: 'ipfs',
        },
        wiki: {
            hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
            protocol: 'ipfs',
        },
        ewiki: {
            hash: 'QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX',
            protocol: 'ipfs',
        },
        test: {
            hash: 'QmW9VJVjio3tgDsRRrkpW5mfMi1frDeC1tY177x2gZNgB5',
            protocol: 'ipfs',
        },
        chaingear: {
            hash: 'QmVwR6vFDGmgH5UMtNZXaH85vDQuwcaaJKvRdKpSiVcZJu',
            protocol: 'ipfs',
        },
        dragons: {
            hash: 'Qmd22Hupa6obYzX5CDrSoAYmkrde8bVEERZDxGqaqu5U7t',
            protocol: 'ipfs',
        },
    },
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
    case 'SET_ROOT_REGISTRY_ITEMS': {
        return {
            ...state,
            items: { ...action.payload },
        };
    }

    default:
        return state;
    }
};

export const init = () => (dispatch, getState) => new Promise((resolve) => {
    let registryItems;
    const registryItemsJson = localStorage.getItem(localStorageItemName);

    if (registryItemsJson == null) {
        registryItems = initState.items;
    } else {
        registryItems = JSON.parse(registryItemsJson);
    }

    dispatch({
        type: 'SET_ROOT_REGISTRY_ITEMS',
        payload: registryItems,
    });
    dispatch(saveRootRegistryItemsInLs());

    resolve(registryItems);
});

export const deleteRegistryItem = itemName => (dispatch, getState) => {
    const registryItems = getState().rootRegistry.items;

    delete registryItems[itemName];

    dispatch({
        type: 'SET_ROOT_REGISTRY_ITEMS',
        payload: registryItems,
    });
    dispatch(saveRootRegistryItemsInLs());
};

export const getRegistryItemsAsArray = (state) => {
    const registryItems = state.rootRegistry.items;
    const registryItemsArray = Object.keys(registryItems).map(key => ({
        name: key,
        hash: registryItems[key].hash,
        protocol: registryItems[key].protocol,
    }));

    return registryItemsArray;
};

export const getRegistryItems = state => state.rootRegistry.items;

export const addRegistryItem = (name, hash, protocol) => (dispatch, getState) => new Promise((resolve) => {
    const registryItems = getState().rootRegistry.items;

    registryItems[name] = {
        hash,
        protocol,
    };

    dispatch({
        type: 'SET_ROOT_REGISTRY_ITEMS',
        payload: registryItems,
    });
    dispatch(saveRootRegistryItemsInLs());

    resolve(registryItems);
});

const saveRootRegistryItemsInLs = () => (dispatch, getState) => {
    const registryItems = getState().rootRegistry.items;

    localStorage.setItem(localStorageItemName, JSON.stringify(registryItems));
};
