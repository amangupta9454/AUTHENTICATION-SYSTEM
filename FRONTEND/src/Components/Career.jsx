import React from 'react'

const Career = () => {
   return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'fixed',
        inset: 0,           // top/right/bottom/left = 0
      }}
    >
      <iframe
        src="https://ai-career-path-genrate.lovable.app"
        title="Attendance Scanner"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
      />
    </div>
  );
}

export default Career