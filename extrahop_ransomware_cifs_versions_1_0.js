// ************************************************************************************************************************************
//
// Ransomware SMB/CIFS Versions v1.0
// Authors: Tom Roeh (ExtraHop)
//
// ************************************************************************************************************************************


smbv1_methods =  [  'BLANK',
//                  'CHECK_DIRECTORY', 
			        'CLOSE', 
//			        'CLOSE_PRINT_FILE', 
//			        'COPY', 
//			        'CREATE', 
//			        'CREATE_DIRECTORY', 
//			        'CREATE_NEW', 
//			        'CREATE_TEMPORARY', 
			        'DELETE', 
//			        'DELETE_DIRECTORY', 
			        'ECHO',                    
//			        'FIND_CLOSE', 
//			        'FIND_CLOSE2', 
//			        'FIND_UNIQUE', 
//			        'FLUSH', 
//			        'GET_PRINT_QUEUE', 
//			        'IOCTL', 
//			        'IOCTL_SECONDARY', 
//			        'LOCK_AND_READ', 
//			        'LOCK_BYTE_RANGE', 
//			        'LOCKING_ANDX', 
			        'LOGOFF_ANDX',     
//			        'MOVE', 
//                  'NEGOTIATE', 
			        'NT_CANCEL', 
			        'NT_CREATE_ANDX', 
			        'NT_RENAME', 
			        'NT_TRANSACT', 
//			        'NT_TRANSACT_CREATE', 
//			        'NT_TRANSACT_IOCTL', 
//			        'NT_TRANSACT_NOTIFY_CHANGE', 
//			        'NT_TRANSACT_QUERY_QUOTA', 
//			        'NT_TRANSACT_QUERY_SECURITY_DESC', 
//			        'NT_TRANSACT_RENAME', 
//			        'NT_TRANSACT_SECONDARY', 
//			        'NT_TRANSACT_SET_QUOTA', 
//			        'NT_TRANSACT_SET_SECURITY_DESC', 
//			        'OPEN', 
//			        'OPEN_ANDX', 
//			        'OPEN_PRINT_FILE', 
//			        'PROCESS_EXIT',     
//			        'QUERY_INFORMATION', 
//			        'QUERY_INFORMATION_DISK', 
//			        'QUERY_INFORMATION2', 
			        'READ', 
			        'READ_ANDX', 
//			        'READ_BULK', 
//			        'READ_MPX', 
//			        'READ_RAW', 
			        'RENAME', 
//			        'SEARCH', 
//			        'SEEK', 
		            'SESSION_SETUP_ANDX',     
//			        'SET_INFORMATION', 
//			        'SET_INFORMATION2', 
//			        'TRANS_CALL_NMPIPE', 
//			        'TRANS_MAILSLOT_WRITE', 
//			        'TRANS_PEEK_NMPIPE', 
//			        'TRANS_QUERY_NMPIPE_INFO', 
//			        'TRANS_QUERY_NMPIPE_STATE', 
//			        'TRANS_RAW_READ_NMPIPE', 
//			        'TRANS_RAW_WRITE_NMPIPE', 
//			        'TRANS_READ_NMPIPE', 
//			        'TRANS_SET_NMPIPE_STATE', 
//			        'TRANS_TRANSACT_NMPIPE', 
//			        'TRANS_WAIT_NMPIPE', 
//			        'TRANS_WRITE_NMPIPE',                  
//			        'TRANS2_CREATE_DIRECTORY', 
//			        'TRANS2_FIND_FIRST2', 
//			        'TRANS2_FIND_NEXT2', 
//			        'TRANS2_FIND_NOTIFY_FIRST', 
//			        'TRANS2_FIND_NOTIFY_NEXT', 
//			        'TRANS2_FSCTL', 
//			        'TRANS2_GET_DFS_REFERRAL', 
//			        'TRANS2_IOCTL2', 
//			        'TRANS2_OPEN2', 
			        'TRANS2_QUERY_FILE_INFORMATION', 
			        'TRANS2_QUERY_FS_INFORMATION', 
			        'TRANS2_QUERY_PATH_INFORMATION', 
//			        'TRANS2_REPORT_DFS_INCONSISTENCY',
//			        'TRANS2_SESSION_SETUP',     
//			        'TRANS2_SET_FILE_INFORMATION', 
//			        'TRANS2_SET_FS_INFORMATION', 
//			        'TRANS2_SET_PATH_INFORMATION', 
			        'TRANSACTION', 
			        'TRANSACTION_SECONDARY', 
			        'TRANSACTION2', 
			        'TRANSACTION2_SECONDARY', 
			        'TREE_CONNECT', 
			        'TREE_CONNECT_ANDX',  
			        'TREE_DISCONNECT',    
//			        'UNLOCK_BYTE_RANGE', 
			        'WRITE', 
//			        'WRITE_AND_CLOSE', 
//			        'WRITE_AND_UNLOCK', 
			        'WRITE_ANDX', 
//			        'WRITE_BULK', 
//			        'WRITE_BULK_DATA', 
//			        'WRITE_COMPLETE', 
//			        'WRITE_MPX', 
//			        'WRITE_MPX_SECONDARY', 
//			        'WRITE_PRINT_FILE', 
//			        'WRITE_RAW',
		          ];


cifs_method = CIFS.method;
cifs_server = Flow.server.ipaddr;
cifs_client = Flow.client.ipaddr;


if (event === "CIFS_REQUEST") {

    if (smbv1_methods.indexOf(cifs_method) > -1) {
        Application("Ransomware").metricAddCount('ransomware-cifs-version-one-clients-count', 1);    
        Application("Ransomware").metricAddDetailCount('ransomware-cifs-version-one-clients', cifs_client, 1);
        //debug('INFO: Got an SMBv1 Request for ' + cifs_method + ' from ' + cifs_client + ' for server ' + cifs_server);          
    }
    
    else if (cifs_method.indexOf('SMB2_') > -1) {
        Application("Ransomware").metricAddCount('ransomware-cifs-version-two-clients-count', 1);   
        Application("Ransomware").metricAddDetailCount('ransomware-cifs-version-two-clients', cifs_client, 1);   
    }
}

if (event === "CIFS_RESPONSE") {

    Application("Ransomware").commit();

    if (smbv1_methods.indexOf(cifs_method) > -1) {
        Application("Ransomware").metricAddCount('ransomware-cifs-version-one-servers-count', 1);    
        Application("Ransomware").metricAddDetailCount('ransomware-cifs-version-one-servers', cifs_server, 1);
        //debug('INFO: Got an SMBv1 Response for ' + cifs_method + ' from ' + cifs_server + ' for client ' + cifs_client);          
    }
    
    else if (cifs_method.indexOf('SMB2_') > -1) {
        Application("Ransomware").metricAddCount('ransomware-cifs-version-two-servers-count', 1);   
        Application("Ransomware").metricAddDetailCount('ransomware-cifs-version-two-servers', cifs_server, 1);   
    }   
}
