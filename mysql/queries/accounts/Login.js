const login = {
    select_1_user : `SELECT
                        a.id as  acc_id,
                        a.user_type_id,
                        a.username,
                        a.password, 
                        a.is_locked,
                        a.state,
                        COUNT(all1.id) as lock_meter,
                        COUNT(DISTINCT IF(dep.department_type_id = 2, ad.id, null)) AS 'traditional_dept',
                        COUNT(DISTINCT IF(dep.department_type_id = 3, ad.id, null)) AS 'violation_dept',
                        COUNT(DISTINCT IF(dep.department_type_id = 4, ad.id, null)) AS 'activity_dept'
                    
                    FROM account a
                    LEFT JOIN account_login_logs AS all1 ON all1.account_id = a.id 
                        AND all1.created_at >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)
                        AND all1.state = 1

                    LEFT JOIN account_departments ad ON ad.account_id = a.id
                    LEFT JOIN departments dep ON dep.id = ad.departments_id
                        
                    WHERE a.user_type_id != 'STUDENT' AND a.username = ?
                        AND a.state = 1

                    GROUP BY a.id;`,

    insert_account_login_logs:  `INSERT INTO account_login_logs (account_id) VALUES(?)`,

    update_account_to_locked :  `UPDATE account SET is_locked = '1' WHERE id = ?`,

    select_blacklist_token : `SELECT
                            IF(COUNT(bt.id) > 0, 'DENY', 'AUTH') AS 'is_token'
                            
                            FROM account AS ac
                            LEFT JOIN blacklist_token AS bt ON bt.account_id = ac.id
                                AND bt.token = ?
                            WHERE ac.id = ? AND ac.state = 1 AND ac.is_locked = 0
                                AND ac.user_type_id = 'ADMIN'
                            GROUP BY ac.id`,

    insert_new_user :  `INSERT INTO account
                        (
                            user_type_id,
                            username,
                            password,
                            fullname,
                            lastname,
                            firstname,
                            middlename,
                            contact_number
                        )
                        VALUES
                        (
                           ?,
                           ?,
                           ?,
                           ?,
                           ?,
                           ?,
                           ?,
                           ?
                        )`,

    insert_blacklist_token : `INSERT INTO blacklist_token
                                (token,account_id)
                                VALUES (? , ?)`,

    select_blacklist_token_all : `SELECT  'AUTH' AS 'is_token'`,

    old_auth : `SELECT  'AUTH' AS 'is_token'
                    IF(COUNT(bt.id) > 0, 'DENY', 'AUTH') AS 'is_token'
                    
                FROM account AS ac
                LEFT JOIN blacklist_token AS bt ON bt.account_id = ac.id
                    AND bt.token = ?
                WHERE ac.id = ? AND ac.state = 1 AND ac.is_locked = 0

                GROUP BY ac.id`,
}

module.exports = login;
