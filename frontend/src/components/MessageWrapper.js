import { TypeAnimation } from 'react-type-animation'

export default function MessageWrapper({content, sender, timestamp, closed}) {
    const datetime = new Date(timestamp)
    const time = datetime.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'})

    if (sender==='user') {
        return(
            <div className="alert alert-info p-2 m-0 float-end" style={{maxWidth: '75%'}}>
                {content}
                <br />
                <div className="font-weight-light float-end" style={{fontSize: '10px'}}>
                    {time}
                </div>
            </div>
        )
    } else {
        return(
            <div className="alert alert-secondary p-2 m-0 float-start" style={{maxWidth: '75%'}}>
                {closed?
                content:
                <TypeAnimation sequence={[content]} speed={85} cursor={false} />}
                <br />
                <div className="font-weight-light float-end" style={{fontSize: '10px'}}>
                    {time}
                </div>
            </div>
        )
    }
}

export function LoadingWrapper() {
    return(
        <div className="alert alert-secondary p-2 m-0 float-start" style={{maxWidth: 'fit-content'}}>
            <TypeAnimation sequence={['...',650,'']} speed={65} repeat={Infinity} cursor={true} />
        </div>
    )
}