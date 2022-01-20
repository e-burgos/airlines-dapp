import React from 'react';

const IconItem = (props) => {
	return (
		<div
			className="list-group-item list-group-item-action d-flex gap-3 py-3"
			aria-current="true"
		>
			<img
				src={props.image}
				alt={props.title}
				width="32"
				height="32"
				className="flex-shrink-0 mt-1 mr-3"
			/>
			<div className="d-flex gap-2 w-100 justify-content-between">
				<div>
					<h6 className="mb-0">
						{props.title}
                        <strong>
                            <span className="text-primary bold">
                                {props.titleColor}
                            </span>
                        </strong>
					</h6>
					<p className="mb-0 opacity-75">
                        {props.subtitle}
					</p>
				</div>
				{props.showButton ? (
					<button
						className={`btn btn-sm btn-success text-white float-right ${props.buttonClassName}`}
						onClick={props.showButton ? props?.buttonFn : null}
					>
						{props.buttonText}
					</button>
				) : null}
			</div>
		</div>
	);
};

export default IconItem;
