
export function PersonEditor({ value, onChange }) {
    const lbStyle = {display: 'inline-block', width: '150px', textAlign: 'right'};
    return (<>
      <div>
        <label style={lbStyle}>Name</label>
        <input value={value?.name} onChange={(e) => { onChange({ ...value, name: e.target.value }) }} />
      </div>
      <div>
        <label style={lbStyle}>Age</label>
        <input value={value?.age}
          onChange={(e) => { onChange({ ...value, age: e.target.value }) }} type="number"  />
      </div>
  
    </>)
  }
