export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 text-sm font-medium mb-2">Total Posts</h3>
                    <p className="text-3xl font-bold">12</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 text-sm font-medium mb-2">Total Services</h3>
                    <p className="text-3xl font-bold">4</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 text-sm font-medium mb-2">Media Files</h3>
                    <p className="text-3xl font-bold">24</p>
                </div>
            </div>
        </div>
    );
}
