<div className="max-w-7xl mx-auto px-4 py-6">
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar />
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {isMaster && (
          <div className="flex gap-2">
            <button
              onClick={() => setView('attendance')}
              className={'px-4 py-2 rounded-lg transition ' + (
                view === 'attendance'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              Dashboard
            </button>
          </div>
        )}
      </div>
    </div>

    {isTeacher && renderAttendanceForm(selectedClass, currentDate)}
    
    {isMaster && view === 'attendance' && renderMasterDashboard()}
    
    {isMaster && view === 'edit' && (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-gray-800">
            Editando: {classes[selectedClass].name}
          </h2>
          <button
            onClick={() => {
              setView('attendance');
              setSelectedClass(null);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Voltar ao Dashboard
          </button>
        </div>
        {renderAttendanceForm(selectedClass, currentDate)}
      </div>
    )}
  </div>
</div>
