// This script is to remove entire users, not strikes
// remove_strike.js is used to reverse automated actions


function remove_user(username) {
    db.run('SELECT * FROM users WHERE Username = ?', [username], function(
        err,
        result,
    ) {
        main.log("User being removed!")
        main.log(`Username: ${result[0].Username}  Points: ${result[0].Points}  Pedophile? ${result[0].Pedophile} Suspicious? ${result[0].Suspicious}`)
    db.run('DELETE FROM users WHERE Username = ?', [
        username,
      ]);
    });
}
var Args = process.argv.slice(2);
main.log("User Removed from Sophie's Database by Administratior!")
main.log(`Username: ${Args[0]}`); //Log admin actions
remove_user(Args[0])