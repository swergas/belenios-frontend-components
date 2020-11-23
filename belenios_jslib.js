// TODO: replace this mock function by usage of Belenios Javascript API (`src/lib/election.ml::of_string()`) when it is ready
const beleniosComputeElectionFingerprint = (election_data) => {
  return "election_fingerprint_aaa";
};

// TODO: replace this mock function by usage of Belenios Javascript API (`src/lib/credential.ml::check()`) when it is ready
const beleniosCredentialCheck = (credential) => {
  return true;
};

function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

// TODO: replace this mock function by usage of Belenios Javascript API (`src/tool/tool_js_booth.ml::encryptBallot()`) when it is ready
async function beleniosEncryptBallot(election_data, credential, voter_ballot_as_plaintext){
  console.log("beleniosEncryptBallot() election_data:", election_data, "credential:", credential, "voter_ballot_as_plaintext:", voter_ballot_as_plaintext);
  await wait(5000);
  return "encrypted_ballot_aaa";
};

const belenios = {
  computeFingerprint: beleniosComputeElectionFingerprint,
  checkCredential: beleniosCredentialCheck,
  encryptBallot: beleniosEncryptBallot
};
