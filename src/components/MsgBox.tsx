
const MsgBox = ({ msg, msgType }: { msg: string, msgType: string }) => (
    <div className={'p-2 alert ' + (msgType === "info" ? "alert-info" : "alert-danger")}>
        {msg}
    </div>
);

export default MsgBox;