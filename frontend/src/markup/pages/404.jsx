import React from "react";
import bg_5 from "../../assets/template_assets/images/background/bg-5.jpg";
const NotFound = () => {
	return (
		<div>
			<section
				className="error-section"
				style={{ backgroundImage: `url(${bg_5})` }}
			>
				<div className="auto-container">
					<div className="content">
						<h1>404</h1>
						<h2>Oops! That page can’t be found</h2>
						<div className="text">
							Sorry, but the page you are looking for does not existing
						</div>
						<a href="/" className="theme-btn btn-style-one">
							Go to home page
						</a>
					</div>
				</div>
			</section>
		</div>
	);
};

export default NotFound;
