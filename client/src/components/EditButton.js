export function EditButton({ setEdit, edit }) {
  const toggleEdit = () => setEdit(!edit);
  return (
    <>
      <button onClick={toggleEdit}>鉛筆マーク</button>
    </>
  );
}