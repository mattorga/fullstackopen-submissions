const Notification = ({ message, isError }) => {
    const successStyle = {
        color: 'green',
        borderColor: 'green',
    }

    const errorStyle = {
        color: 'red',
        borderColor: 'red',
    }

    if (message === null) {
        return null
    }

    return (
        <div className='notification' style={isError ? errorStyle : successStyle}>
            {message}
        </div>
    )
}

export default Notification