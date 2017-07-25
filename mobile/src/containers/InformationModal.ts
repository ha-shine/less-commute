import {connect, Dispatch} from "react-redux";
import {hideModal} from "../actions/index";
import InformationModal from "../components/InformationModal";

function mapDispatchToProps(dispatch: Dispatch<object>) {
    return {
        closeModal: () => { dispatch(hideModal()); }
    };
}

export default connect(null, mapDispatchToProps)(InformationModal);