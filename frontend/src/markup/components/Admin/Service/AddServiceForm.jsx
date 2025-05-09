// AddServiceForm.jsx
import React from "react";

const AddServiceForm = ({ form, onChange, onSubmit, editingId, error }) => {
	return (
		<div className="row clearfix">
			<div className="form-column col-lg-12">
				<div className="inner-column">
					<div className="contact-form">
						<form onSubmit={onSubmit}>
							<div className="form-group col-md-12">
								<input
									type="text"
									name="service_name"
									value={form.service_name}
									onChange={onChange}
									placeholder="Service Name"
								/>
							</div>
							<div className="form-group col-md-12">
								<textarea
									name="service_description"
									value={form.service_description}
									onChange={onChange}
									placeholder="Service Description"
								></textarea>
							</div>
							<div className="form-group col-md-12">
								<button
									className="theme-btn btn-style-one"
									type="submit"
									data-loading-text="Please wait ..."
								>
									{editingId ? "Update Service" : "Add Service"}
								</button>
							</div>
						</form>
						{error && (
							<div className="validation-error">
								<p>{error}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddServiceForm;
