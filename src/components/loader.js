import Lottie from 'lottie-react';
import animationData from '../lotties/loader.json';

export default function Loader(props) {
    const isTransparent = props.isTransparent ? props.isTransparent : null;
    return (
        <div className={`${isTransparent ? 'loader-overlay' : ''}`}>
            <div className={`${isTransparent ? 'loader-container text-center' : 'loader text-center p-3'}`}>
                <Lottie animationData={animationData} loop style={{ height: 150 }} />
                <div className="text">{props.options?.text}</div>
            </div>
        </div>
    );
}