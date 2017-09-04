<?php

function wlog($str, $file = false)
{
    echo $str;
    if ($file) {
        file_put_contents('run.log', $str, FILE_APPEND);
    }
}

function run($cmds, $log = false)
{
    foreach ((array)$cmds as $cmd) {
        $output = [];
        $return = null;
        wlog("> $cmd ", $log);
        exec($cmd, $output, $return);
        wlog("[$return] \n", $log);

        foreach ($output as $line) {
            wlog($line . "\n", $log);
        }
    }
}

run([
    'git checkout master',
    'git pull origin master',
    'git checkout -',
    'git merge master',
    'bower install -V',
    'bower update -V'
], true);
