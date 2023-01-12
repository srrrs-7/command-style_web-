import { useRecoilState } from 'recoil';
import { createState } from 'recoil/manage';
import CreateAdmin from './create/CreateAdmin';
import CreateCode from './create/CreateCode';
import CreateCollection from './create/CreateCollection';
import CreateMedia from './create/CreateMedia';
import CreateUser from './create/CreateUser';

function Manage() {
    const [adminPath, _] = useRecoilState<string>(createState);

    return (
        <div>
            <div>
                {adminPath == 'admin' && <CreateAdmin />}
                {adminPath == 'code' && <CreateCode />}
                {adminPath == 'collection' && <CreateCollection />}
                {adminPath == 'media' && <CreateMedia />}
                {adminPath == 'users' && <CreateUser />}
            </div>
        </div>
    );
}

export default Manage;
