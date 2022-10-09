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
        address creator;
        string configIPFSHash;
    }

    uint256 public lastFormId;

    mapping(uint256 => Form) public forms;
    mapping(uint256 => TokenPointer[]) public accessControlTokens;
    mapping(uint256 => TokenPointer[]) public credentials;
    mapping(uint256 => FormResponse[]) public responses;

    mapping(address => uint256[]) public createdForms;
    mapping(address => uint256[]) public respondedForms;
    mapping(address => mapping(uint256 => uint256[])) public responseIDs;

    function createForm(
        string calldata _configIPFSHash,
        TokenPointer[] calldata _accessControlTokens,
        TokenPointer[] calldata _credentials
    ) public returns (uint256) {
        Form storage newForm = forms[lastFormId];
        newForm.creator = msg.sender;
        newForm.configIPFSHash = _configIPFSHash;

        for(uint i = 0; i < _accessControlTokens.length; i++) {
            accessControlTokens[lastFormId].push(_accessControlTokens[i]);
        }

        for(uint i = 0; i < _credentials.length; i++) {
            credentials[lastFormId].push(_credentials[i]);
        }

        createdForms[msg.sender].push(lastFormId);

        lastFormId++;
        return lastFormId-1;
    }

    function submitFormResponse(
        uint256 formId,
        string calldata _responseHash
    ) public returns (uint256) {
        for(uint i = 0; i < accessControlTokens[formId].length; i++) {
            TokenPointer storage curTP = accessControlTokens[formId][i];
            require(IERC1155(curTP.contractAddress).balanceOf(msg.sender, curTP.tokenId) > 0,
                    "User does not own required token");
        }
        responses[formId].push(FormResponse(msg.sender, _responseHash));
        respondedForms[msg.sender].push(formId);

        uint256 newResponseId = responses[formId].length - 1;
        responseIDs[msg.sender][formId].push(newResponseId);
        return newResponseId;
    }

    function getAccessControlTokens(uint256 formId) public view returns(TokenPointer[] memory) {
        TokenPointer[] memory returnVal = new TokenPointer[](accessControlTokens[formId].length);
        for(uint i = 0; i < accessControlTokens[formId].length; i++) {
           returnVal[i] = accessControlTokens[formId][i];
        }
        return returnVal;
    }

    function getCredentials(uint256 formId) public view returns(TokenPointer[] memory) {
        TokenPointer[] memory returnVal = new TokenPointer[](credentials[formId].length);
        for(uint i = 0; i < credentials[formId].length; i++) {
           returnVal[i] = credentials[formId][i];
        }
        return returnVal;
    }

    function getResponses(uint256 formId) public view returns(FormResponse[] memory) {
        FormResponse[] memory returnVal = new FormResponse[](responses[formId].length);
        for(uint i = 0; i < responses[formId].length; i++) {
           returnVal[i] = responses[formId][i];
        }
        return returnVal;
    }

    function getCreatedForms(address _address) public view returns(uint256[] memory) {
        uint256[] memory returnVal = new uint256[](createdForms[_address].length);
        for(uint i = 0; i < createdForms[_address].length; i++) {
           returnVal[i] = createdForms[_address][i];
        }
        return returnVal;
    }

    function getRespondedForms(address _address) public view returns(uint256[] memory) {
        uint256[] memory returnVal = new uint256[](respondedForms[_address].length);
        for(uint i = 0; i < respondedForms[_address].length; i++) {
           returnVal[i] = respondedForms[_address][i];
        }
        return returnVal;
    }

    function getResponseIDs(address _address, uint256 formId) public view returns(uint256[] memory) {
        uint256[] memory returnVal = new uint256[](responseIDs[_address][formId].length);
        for(uint i = 0; i < responseIDs[_address][formId].length; i++) {
           returnVal[i] = responseIDs[_address][formId][i];
        }
        return returnVal;
    }
}
