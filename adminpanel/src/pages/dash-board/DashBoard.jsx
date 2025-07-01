import React from "react";

const DashBoard = () => {


    const stats = [
        { title: "Today's Sales", value: '₹12,350', icon: 'bi-currency-rupee' },
        { title: 'Orders Today', value: '98', icon: 'bi-bag-check' },
        { title: 'Pending Orders', value: '12', icon: 'bi-clock-history' },
        { title: 'Total Revenue', value: '₹3,45,000', icon: 'bi-graph-up-arrow' },
    ];

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center fw-bold text-primary">Admin Dashboard</h2>

            <div className="row g-4">
                {stats.map((stat, index) => (
                    <div className="col-md-6 col-xl-3" key={index}>
                        <div className="card shadow-sm border-0 text-center h-100">
                            <div className="card-body">
                                <i className={`bi ${stat.icon} display-6 text-primary mb-3`}></i>
                                <h5 className="card-title fw-bold">{stat.title}</h5>
                                <p className="card-text fs-4 text-success">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 text-center">
                <button className="btn btn-primary btn-lg">View Detailed Reports</button>
            </div>
        </div>
    );
}
export default DashBoard;