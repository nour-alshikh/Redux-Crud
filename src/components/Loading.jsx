import React from 'react'

function Loading({ loading, error, children }) {

    const elementType = children?.type?.render?.displayName

    const loadingHandler = () => {
        if (elementType === "Button") {
            const cloneButton = React.cloneElement(children, { disabled: true }, "Loading")
            return <>
                {loading ?
                    cloneButton
                    : error ?
                        (
                            <>
                                {children}
                                <p>Server Error</p>
                            </>
                        )
                        : children
                }
            </>
        }

        return (
            <>
                {loading ?
                    (
                        <p>Loading data, please wait....</p>
                    )
                    : error ?
                        (
                            <p>{error}</p>
                        )
                        : children
                }
            </>
        )
    }
    return loadingHandler()
}

export default Loading;
