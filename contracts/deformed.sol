pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract Deformed {
    struct TokenPointer {
        address contractAddress;
        uint256 tokenId;
    }

    struct FormResponse {
        address respondingAddress;
        string responseIPFSHash;
    }

    struct Form {
        string configIPFSHash;
        TokenPointer[] accessControlTokens;
        TokenPointer[] credentials;
        FormResponse[] responses;
    }

    Form[] public forms;

    mapping(address => uint256[]) public createdForms;
    mapping(address => uint256[]) public respondedForms;
    mapping(address => mapping(uint256 => uint256[])) public responseIDs;

    function createForm(
        string calldata _configIPFSHash,
        TokenPointer[] calldata _accessControlTokens,
        TokenPointer[] calldata _credentials
    ) public returns (uint256) {
        Form storage newForm = forms.push();
        for(uint i = 0; i < _accessControlTokens.length; i++) {
            newForm.accessControlTokens.push(_accessControlTokens[i]);
        }
        for(uint i = 0; i < _credentials.length; i++) {
            newForm.credentials.push(_credentials[i]);
        }
        newForm.configIPFSHash = _configIPFSHash;

        uint256 newFormId = forms.length - 1;
        createdForms[msg.sender].push(newFormId);
        return newFormId;
    }

    function submitFormResponse(
        uint256 formId,
        string calldata _responseHash
    ) public returns (uint256) {
        Form storage curForm = forms[formId];
        for(uint i = 0; i < curForm.accessControlTokens.length; i++) {
            TokenPointer storage curTP = curForm.accessControlTokens[i];
            require(IERC1155(curTP.contractAddress).balanceOf(msg.sender, curTP.tokenId) > 0,
                    "User does not own required token");
        }
        curForm.responses.push(FormResponse(msg.sender, _responseHash));
        uint256 newResponseId = curForm.responses.length - 1;

        respondedForms[msg.sender].push(formId);
        responseIDs[msg.sender][formId].push(newResponseId);
        return newResponseId;
    }
}
