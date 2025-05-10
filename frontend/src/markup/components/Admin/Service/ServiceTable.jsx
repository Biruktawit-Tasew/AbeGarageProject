// ServiceTable.jsx
import React from "react";
import "boxicons";

const ServiceTable = ({ services, onEdit, onClear }) => {
	return (
		<ul>
			{services?.map((service) => (
				<div className="row " key={service.service_id}>
					<div className="col-lg-12 serviceBox bottomLine-remove ServiceTable">
						<div className="inner-box hvr-float-shadow ServiceTable ServiceTable">
							<li className="serviceNameDescription ServiceTable d-flex">
								<div>
									<h2 className="ServiceTableName">{service.service_name}</h2>
									<h5 className="ServiceTableDescription">
										{service.service_description}
									</h5>
								</div>
								<div>
									<button onClick={() => onEdit(service)}>
										<box-icon type="solid" name="edit"></box-icon>
									</button>
									<button onClick={onClear}>
										<box-icon type="solid" name="trash"></box-icon>
									</button>
								</div>
							</li>
						</div>
					</div>
				</div>
			))}
		</ul>
	);
};

export default ServiceTable;
