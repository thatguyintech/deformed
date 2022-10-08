pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract Deformed {
    struct TokenPointer {
        address contractAddress;
        uint256 tokenId;
    }

    struct Form {
        string configIPFSHash;
        TokenPointer[] accessControlTokens;
        TokenPointer[] credentials;
        string[] responses;
    }

    Form[] public forms;

    function createForm(
        string calldata _configIPFSHash,
        TokenPointer[] calldata _accessControlTokens,
        TokenPointer[] calldata _credentials
    ) public {
        Form storage newForm = forms.push();
        for(uint i = 0; i < _accessControlTokens.length; i++) {
            newForm.accessControlTokens.push(_accessControlTokens[i]);
        }
        for(uint i = 0; i < _credentials.length; i++) {
            newForm.credentials.push(_credentials[i]);
        }
        newForm.configIPFSHash = _configIPFSHash;
    }

    function submitFormResponse(
        uint256 formId,
        string calldata _responseHash
    ) public {
        Form storage curForm = forms[formId];
        for(uint i = 0; i < curForm.accessControlTokens.length; i++) {
            TokenPointer storage curTP = curForm.accessControlTokens[i];
            require(IERC1155(curTP.contractAddress).balanceOf(msg.sender, curTP.tokenId) > 0,
                    "User does not own required token");
        }
        curForm.responses.push(_responseHash);
    }
}
