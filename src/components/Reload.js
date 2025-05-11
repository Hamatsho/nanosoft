

const Reload = ({onClick, message}) => {
    return (
        <div className="containerMe " 
        key={message+"reload"}
        style={{textAlign:"center",
            height:"100vh"
        }}
        >
            <din>
                <img src="/imgs/nanologo.png" width={"150px"} height={"150px"} alt=""/>
            </din>
            <div className="c-grey p-20"> {message} </div>
            <button className="hideStyle p-10 m-auto w-100 "
            style={{backgroundColor:"var(--three-color)",
                color:"white",
                borderRadius:"10px"
            }} 
            onClick={onClick} > Try agin </button>
        </div>
    )
}

export default Reload;