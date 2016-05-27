<?php

function run($cmds)
{
    foreach ((array)$cmds as $cmd) {
        $output = [];
        $return = null;
        exec($cmd, $output, $return);

        foreach ($output as $line) {
            echo $line . "\n";
        }
    }
}

run('git pull');
run('git pull >> deploy.log');
