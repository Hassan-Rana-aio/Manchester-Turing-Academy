import React from "react";

const ImageTextCard = ({ image, text, heading }) => {
    return (
        <div className="">
            <div className="bg-primaryBgDarkColor p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="">
                    <img src={image} alt="" className="w-full max-h-[400px]"/>
                </div>
                <div className="">
                    <h1 className="text-white tracking-widest text-[25px] uppercase">{heading}</h1>
                    <p className="py-6 text-slate-200">{text}</p>
                </div>

            </div>
        </div>
    );
};

export default ImageTextCard;
