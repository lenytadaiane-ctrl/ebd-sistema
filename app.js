const { useState, useEffect } = React;

const EBDApp = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('Sistema EBD funcionando! 🎉');
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '20px'
        }}>
          Sistema EBD
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#4f46e5',
          marginTop: '20px'
        }}>
          {message}
        </p>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginTop: '20px'
        }}>
          Escola Bíblica Dominical
        </p>
      </div>
    </div>
  );
};

ReactDOM.render(<EBDApp />, document.getElementById('root'));
