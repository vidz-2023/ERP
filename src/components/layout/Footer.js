import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <>
            {/* <nav className="navbar fixed-bottom layout-color">
                <div className="container-fluid  d-flex justify-content-center">
                    <NavLink className="navbar-brand " href="#">ERP &copy; copyright</NavLink>
                </div>
            </nav> */}


            {/* <!-- Footer --> */}
            <footer class="footer mt-auto">
                <div class="copyright bg-white">
                    <p>
                        &copy; <span id="copy-year"></span> Copyright ERP Dashboard by <a class="text-primary"
                            href="#" target="_blank">A</a>.
                    </p>
                </div>
                <script>
                    var d = new Date();
                    var year = d.getFullYear();
                    document.getElementById("copy-year").innerHTML = year;
                </script>
            </footer>
            
        </>
    )
}

export default Footer