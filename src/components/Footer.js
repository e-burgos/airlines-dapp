import React from 'react';
import linkedin from '../assets/linkedin-logo.png'
import webLogo from '../assets/web-logo.png'
import github from '../assets/github-logo.png'

const Footer = () => {
	return (
		<div className="container footer-position">
			<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
				<div className="col-md-4 d-flex align-items-center">
					<span className="text-muted">© 2021 - Esteban Burgos</span>
				</div>
				<ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
					<li className="ms-3">
						<a className="text-muted" href="https://www.linkedin.com/in/estebanburgos/">
							<img
								src={linkedin}
								alt="linkedin"
								width="24"
								height="24"
								className="rounded-circle flex-shrink-0 mr-3"
							/>
						</a>
					</li>
                    <li className="ms-3">
						<a className="text-muted" href="https://www.estebanburgos.com.ar/">
							<img
								src={webLogo}
								alt="webLogo"
								width="24"
								height="24"
								className="rounded-circle flex-shrink-0 mr-3"
							/>
						</a>
					</li>
					<li className="ms-3">
						<a className="text-muted" href="https://github.com/e-burgos">
							<img
								src={github}
								alt="github"
								width="24"
								height="24"
								className="rounded-circle flex-shrink-0 mr-3"
							/>
						</a>
					</li>
				</ul>
			</footer>
		</div>
	);
};

export default Footer;
